import React, { useCallback, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import {
  Axis,
  Bisector,
  D3ZoomEvent,
  interpolateRainbow,
  interpolateSinebow,
  interpolateTurbo,
  isoParse,
  ScaleLinear,
  ScaleOrdinal,
  ScaleTime,
  Selection,
  ZoomBehavior,
  ZoomTransform,
} from "d3";
import { LeaderboardPoint, Tier } from "types/Leaderboard";
import { DateTime } from "luxon";
import { formatPoints } from "utils/formatPoints";
import { Box, useBreakpoint } from "@chakra-ui/react";
import { CenteredSpinner } from "./CenteredSpinner";
import { allTiers, tierBorders } from "constants/tierborder";

const ANIMATION_SPEED = 500;
export const Graph = ({
  id,
  points,
  startDate,
  endDate,
  isLive = false,
  width: _width,
  height: _height = 600,
  showTooltip = false,
  ...props
}: {
  id: string;
  points: LeaderboardPoint[];
  startDate: string;
  endDate: string;
  isLive?: boolean;
  isSmall?: boolean;
  width?: number;
  height?: number;
  showTooltip?: boolean;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const parent = useRef<Selection<HTMLDivElement, any, any, any>>();
  const svg = useRef<Selection<any, any, any, any>>();

  const x = useRef<ScaleTime<number, number, never>>();
  const xAxis = useRef<Axis<any>>();
  const y = useRef<ScaleLinear<number, number, never>>();
  const yAxis = useRef<Axis<any>>();
  const color = useRef<ScaleOrdinal<number, string, never>>();

  const clip = useRef<Selection<any, any, any, any>>();
  const graph = useRef<Selection<any, any, any, any>>();

  const zoom = useRef<ZoomBehavior<any, any>>();
  const xZoomed = useRef<ScaleTime<any, any, any>>();
  const zoomTransform = useRef<ZoomTransform>();

  const bisectX = useRef(
    d3.bisector<LeaderboardPoint, Date>((d) => {
      return isoParse(d.date);
    }).left
  );

  const tooltips = useRef<Selection<any, any, any, any>>();

  const xLine = useRef<Selection<any, any, any, any>>();
  const toolTip = useRef<Selection<any, any, any, any>>();

  const hoverBoundary = useRef<Selection<any, any, any, any>>();

  const breakpoint = useBreakpoint();

  const isSmall = props.isSmall || breakpoint === "base" || breakpoint === "sm";

  const margin = useMemo(() => {
    return { top: 20, right: 20, bottom: 30, left: isSmall ? 45 : 60 };
  }, [isSmall]);

  const width = useMemo(() => {
    const w = _width - margin.left - margin.right;
    return w < 0 ? 0 : w;
  }, [margin, _width]);
  const height = useMemo(() => {
    const h = _height - margin.top - margin.bottom;
    return h < 0 ? 0 : h;
  }, [margin, _height]);

  useEffect(() => {
    zoom.current = d3
      .zoom()
      .scaleExtent([1, 500])
      .extent([
        [0, 0],
        [width, height],
      ])
      .translateExtent([
        [0, -Infinity],
        [width, Infinity],
      ])
      .on("zoom", zoomed);

    parent.current = d3.select(parentRef.current);
    svg.current = parent.current
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.current = d3.scaleTime().range([0, width]);
    y.current = d3.scaleLinear().range([height, 0]);

    xZoomed.current = x.current;
    clip.current = svg.current
      .append("clipPath")
      .attr("id", "clip-" + id)
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    svg.current
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")");

    svg.current.append("g").attr("class", "yAxis");

    svg.current
      .append("g")
      .attr("class", "xGrid")
      .attr("transform", "translate(0," + height + ")");

    // add the Y gridlines
    svg.current.append("g").attr("class", "yGrid");

    xAxis.current = d3.axisBottom(x.current);
    yAxis.current = d3.axisLeft(y.current);

    color.current = d3
      .scaleOrdinal<number, string, never>()
      .range(
        Array(30)
          .fill(null)
          .map((_, i, arr) => interpolateSinebow(i / arr.length))
      )
      .domain(allTiers);
    graph.current = svg.current
      .append("g")
      .attr("clip-path", `url(#clip-${id})`)
      .attr("id", "lines");

    if (showTooltip) {
      tooltips.current = svg.current
        .append("g")
        .attr("class", "tooltip")
        .style("padding", "2px")
        .style("background-color", "red");

      xLine.current = tooltips.current
        .append("line")
        .style("stroke-width", 1)
        .style("stroke", "grey");

      toolTip.current = parent.current
        .append("div")
        .style("display", null)
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("padding", "2px")
        .style("background-color", "lightgray")
        .style("opacity", 0.8)
        .style("z-index", 3);

      toolTip.current.append("p").style("font-size", "0.9em");
      toolTip.current
        .append("ul")
        .attr("class", "scoreboard")
        .style("font-size", "0.75em")
        .style("list-style-type", "none");
    }

    return () => {
      parent.current.selectAll("*").remove();
    };
  }, [width, height, isLive, showTooltip]);

  function zoomed(event: D3ZoomEvent<any, any>) {
    zoomTransform.current = event.transform;

    xZoomed.current = zoomTransform.current.rescaleX(x.current);
    xAxis.current = d3.axisBottom(xZoomed.current);

    tooltips.current?.style("opacity", 0);
    toolTip.current?.style("display", "none");

    updateAxes();

    graph.current.selectAll("path.line").attr("d", (d: any) => {
      return d3
        .line<LeaderboardPoint>()
        .x(function (d) {
          return xZoomed.current(isoParse(d.date));
        })
        .y(function (d) {
          return y.current(d.points);
        })(d[1]);
    });
  }

  const updateTooltip = useCallback(
    (event: MouseEvent) => {
      // recover coordinate we need
      if (points.length === 0) return;
      const pos = d3.pointer(event);
      let x0 = xZoomed.current.invert(pos[0]);
      let i = bisectX.current(points, x0, 1);

      if (!points[i]) {
        tooltips.current.style("opacity", 0);
        toolTip.current.style("display", "none");
        return;
      }
      tooltips.current.style("opacity", 1);
      toolTip.current.style("display", "block");

      const x = xZoomed.current(isoParse(points[i].date));
      const groups = d3
        .groups(points, (d) => d.rank)
        .sort((a, b) => a[0] - b[0]);

      const latestPoint = groups
        .map(([tier, points]) => {
          return [tier, points[bisectX.current(points, x0, 1)]] as [
            Tier,
            LeaderboardPoint
          ];
        })
        .filter((p) => !!p[1]);

      xLine.current
        .attr("y1", 0)
        .attr("y2", height)
        .attr("x1", x)
        .attr("x2", x);

      const divPos = d3.pointer(event, parent.current);

      const tooltip = toolTip.current.selectAll("p");
      tooltip.text(DateTime.fromJSDate(x0).toFormat("HH:mm:ss DD"));

      toolTip.current.style("left", divPos[0] + 10 + "px");
      toolTip.current.style("top", divPos[1] + "px");

      const tierList = toolTip.current
        .select(".scoreboard")
        .selectAll("li")
        .data(latestPoint);

      tierList.enter().append("li");
      tierList.exit().remove();
      tierList.text((d) => `T${formatPoints(d[0])}: ${d[1].points}`);

      const graphPoint = tooltips.current
        .selectAll("circle")
        .data(latestPoint, (k) => k[0]);

      graphPoint
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("tier", (d) => d[0])
        .attr("r", 4);

      graphPoint.exit().remove();

      graphPoint
        .attr("fill", (d) => color.current(d[0]))
        .attr("cx", x)
        .attr("cy", (d) => y.current(d[1].points));
    },
    [height, points]
  );

  function mouseout() {
    tooltips.current.style("opacity", 0);
    toolTip.current.style("display", "none");
  }

  useEffect(() => {
    hoverBoundary.current = svg.current
      .append("rect")
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr("width", width)
      .attr("height", height);

    if (showTooltip) {
      hoverBoundary.current
        .on("mousemove", (event) => {
          updateTooltip(event);
        })
        .on("mouseout", mouseout);
    }

    if (!isLive) {
      hoverBoundary.current.call(zoom.current);
    }

    return () => {
      hoverBoundary.current.remove();
    };
  }, [width, height, updateTooltip, showTooltip]);

  const updateAxes = useCallback(
    (withTransition: boolean = false) => {
      svg.current
        .select(".xGrid")
        .attr("color", "lightgray")
        .transition()
        .duration(withTransition ? ANIMATION_SPEED : 0)
        .call(
          d3
            .axisBottom(xZoomed.current)
            .tickSize(-height)
            .tickFormat(() => "") as any
        );
      svg.current
        .select(".yGrid")
        .attr("color", "lightgray")
        .transition()
        .duration(withTransition ? ANIMATION_SPEED : 0)
        .call(
          d3
            .axisLeft(y.current)
            .tickSize(-width)
            .tickFormat(() => "") as any
        );
      svg.current
        .select(".xAxis")
        .transition()
        .duration(withTransition ? ANIMATION_SPEED : 0)
        .call(xAxis.current as any);
      svg.current
        .select(".yAxis")
        .transition()
        .duration(withTransition ? ANIMATION_SPEED : 0)
        .call(
          isSmall
            ? yAxis.current.tickFormat((d) => formatPoints(d))
            : (yAxis.current as any)
        );
    },
    [height, width, isSmall]
  );

  useEffect(() => {
    const afterMax = DateTime.now().plus({ minutes: 30 });
    const eventStart = DateTime.fromISO(startDate);
    const eventEnd = DateTime.fromISO(endDate);
    const timeStart = isLive
      ? startDate &&
        DateTime.now().minus({ hour: 3 }).diff(eventStart).as("second") < 0
        ? eventStart.toJSDate()
        : DateTime.now().minus({ hour: 3 }).toJSDate()
      : startDate
      ? eventStart.toJSDate()
      : d3.min(points, (d: LeaderboardPoint) => isoParse(d.date));

    const timeEnd = isLive
      ? DateTime.now().plus({ minutes: 30 }).diff(eventEnd).as("seconds") > 0
        ? eventEnd
        : afterMax
      : afterMax;

    const bounds = [timeStart, timeEnd];

    x.current.domain(bounds);

    if (zoomTransform.current) {
      xZoomed.current = zoomTransform.current.rescaleX(x.current);
      xAxis.current = d3.axisBottom(xZoomed.current);
    }

    y.current
      .domain([
        isLive
          ? d3.min(
              points.filter(
                (d) =>
                  DateTime.fromISO(d.date)
                    .diff(DateTime.fromJSDate(timeStart))
                    .as("seconds") > 0
              ),
              (d) => d.points
            )
          : 0,
        d3.max(points, (d) => d.points),
      ])
      .nice();

    let graphData = d3.groups(points, (d) => d.rank);

    const graphNode = graph.current
      .selectAll("path")
      .data(graphData, (k) => k[0]);

    graphNode
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("tier", (d) => d[0])
      .attr("fill", "none")
      .attr("stroke", function (d) {
        return color.current(d[0]);
      })
      .attr("stroke-width", 2);

    graphNode.exit().remove();

    graph.current
      .selectAll("path.line")
      .transition()
      .duration(ANIMATION_SPEED)
      .attr("d", (d: any) => {
        return d3
          .line<LeaderboardPoint>()
          .x(function (d) {
            return xZoomed.current(isoParse(d.date));
          })
          .y(function (d) {
            return y.current(d.points);
          })(d[1]);
      });

    updateAxes(true);
  }, [points, width, height, isSmall, showTooltip]);

  if (width === 0 && height === 0) return <CenteredSpinner />;
  return <Box ref={parentRef}></Box>;
};
