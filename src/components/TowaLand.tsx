const PIXI = require("pixi.js");
(window as any).PIXI = PIXI;
require("pixi-spine");
import { Flex } from "@chakra-ui/layout";
import { useEffect, useRef } from "react";
import { Application, Sprite } from "pixi.js";
import { useSize } from "web-api-hooks";

export const Towaland = () => {
  const pixi = useRef<Application>();
  const parentRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(parentRef);

  useEffect(() => {
    pixi.current = new PIXI.Application({ backgroundAlpha: 0, width, height });
    const { current: app } = pixi;
    parentRef.current.appendChild(app.view);

    app.loader
      .add("towa", "spine/spine_chara_0330001.json")
      .add("muni", "spine/spine_chara_0130001.json")
      .load((loader, resources) => {
        const towa = new (PIXI as any).spine.Spine(resources.towa.spineData) as
          | Sprite
          | any;
        const muni = new (PIXI as any).spine.Spine(resources.muni.spineData) as
          | Sprite
          | any;
        towa.skeleton.setSkinByName("normal");
        muni.skeleton.setSkinByName("reverse");
        const scaleT = (0.3 * app.renderer.width) / towa.width;
        towa.scale.x = scaleT;
        towa.scale.y = scaleT;
        muni.scale.x = -1 * scaleT;
        muni.scale.y = scaleT;
        towa.x = 0.2 * app.renderer.width;
        towa.y = 1.2 * app.renderer.height;
        muni.x = 0.8 * app.renderer.width;
        muni.y = 1.2 * app.renderer.height;
        towa.state.setAnimation(0, "06_talk_A", true);
        muni.state.setAnimation(0, "07_talk_B", true);
        app.stage.addChild(towa);
        app.stage.addChild(muni);
      });
    return () => {
      parentRef.current?.removeChild(app.view);
      //   app.destroy();
    };
  }, [width, height]);
  return (
    <Flex
      bgColor="white.200"
      minW="500"
      minH="800"
      w="full"
      h="full"
      ref={parentRef}
    ></Flex>
  );
};

export default Towaland;
