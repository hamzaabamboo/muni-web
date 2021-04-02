import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import {
  Axis,
  D3ZoomEvent,
  isoParse,
  ScaleLinear,
  ScaleOrdinal,
  ScaleTime,
  Selection,
  ZoomBehavior,
  ZoomTransform,
} from "d3";
import { LeaderboardPoint } from "types/Leaderboard";
import { DateTime } from "luxon";
import { formatPoints } from "utils/formatPoints";
import { CenteredSpinner } from "./CenteredSpinner";

const ANIMATION_SPEED = 500;
export const Graph = ({
  points,
  startDate,
  endDate,
  isSmall = false,
  isLive = false,
  width: _width,
  height: _height = 600,
}: {
  points: LeaderboardPoint[];
  startDate: string;
  endDate: string;
  isLive?: boolean;
  isSmall?: boolean;
  width?: number;
  height?: number;
}) => {
  const svg = useRef<Selection<any, any, any, any>>();

  const x = useRef<ScaleTime<number, number, never>>();
  const xAxis = useRef<Axis<any>>();
  const y = useRef<ScaleLinear<number, number, never>>();
  const yAxis = useRef<Axis<any>>();
  const color = useRef<ScaleOrdinal<any, any, never>>();

  const clip = useRef<Selection<any, any, any, any>>();
  const graph = useRef<Selection<any, any, any, any>>();

  const zoom = useRef<ZoomBehavior<any, any>>();
  const xZoomed = useRef<ScaleTime<any, any, any>>();
  const zoomTransform = useRef<ZoomTransform>();

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
    d3.select("#lbgraph").selectAll("*").remove();

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

    svg.current = d3
      .select("#lbgraph")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.current = d3.scaleTime().range([0, width]);
    y.current = d3.scaleLinear().range([height, 0]);

    xZoomed.current = x.current;
    clip.current = svg.current
      .append("clipPath")
      .attr("id", "graph")
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
      .scaleOrdinal()
      .range([
        "#e41a1c",
        "#377eb8",
        "#4daf4a",
        "#984ea3",
        "#ff7f00",
        "#ffff33",
        "#a65628",
        "#f781bf",
        "#999999",
      ]);

    graph.current = svg.current
      .append("g")
      .attr("clip-path", "url(#graph)")
      .attr("id", "lines");

    d3.select("#lbgraph").call(zoom.current);

    () => {
      d3.select("#lbgraph").selectAll("*").remove();
    };
  }, [width, height]);

  function zoomed(event: D3ZoomEvent<any, any>) {
    if (isLive) return;
    zoomTransform.current = event.transform;

    xZoomed.current = zoomTransform.current.rescaleX(x.current);
    xAxis.current = d3.axisBottom(xZoomed.current);

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

    color.current = color.current.domain(new Set(points.map((p) => p.rank)));

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
  }, [points, width, height, isSmall]);

  if (points.length === 0) return <CenteredSpinner />;

  return <svg id="lbgraph"></svg>;
};
