import { Box } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { LeaderboardContext } from "src/contexts/LeaderboardContext";
import * as d3 from "d3";
import {
  Axis,
  BaseType,
  BrushBehavior,
  D3ZoomEvent,
  groups,
  isoParse,
  ScaleLinear,
  ScaleOrdinal,
  ScaleTime,
  Selection,
  ZoomBehavior,
  ZoomTransform,
} from "d3";
import { LeaderboardPoint } from "types/Leaderboard";
import { getAllLeaderboard } from "api/getAllLeaderboard";
import { GraphContext } from "src/contexts/GraphContext";
import { EventContext } from "src/contexts/EventContext";
import { DateTime } from "luxon";

const ANIMATION_SPEED = 500;
export const Graph = () => {
  const { points } = useContext(GraphContext);
  const { event } = useContext(EventContext);

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

  const margin = { top: 20, right: 20, bottom: 30, left: 60 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

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
  }, []);

  function zoomed(event: D3ZoomEvent<any, any>) {
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

  const updateAxes = useCallback((withTransition: boolean = false) => {
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
      .call(yAxis.current as any);
  }, []);

  useEffect(() => {
    x.current.domain([
      event
        ? DateTime.fromISO(event.startdate).toJSDate()
        : d3.min(points, (d: LeaderboardPoint) => isoParse(d.date)),
      DateTime.fromJSDate(
        d3.max(points, (d: LeaderboardPoint) => isoParse(d.date))
      )
        .plus({ hour: 1 })
        .toJSDate(),
    ]);

    if (zoomTransform.current) {
      xZoomed.current = zoomTransform.current.rescaleX(x.current);
      xAxis.current = d3.axisBottom(xZoomed.current);
    }

    y.current.domain([0, d3.max(points, (d) => d.points)]).nice();

    let graphData = d3.groups(points, (d) => d.rank);

    color.current = color.current.domain(graphData.map((d) => d[0]));

    const graphNode = graph.current.selectAll("path").data(graphData);

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

    graphNode.exit().remove();

    updateAxes(true);
  }, [points]);

  if (!points) return <Spinner />;

  return (
    <Box maxW="100vw" maxH="100vh">
      <svg id="lbgraph"></svg>
    </Box>
  );
};
