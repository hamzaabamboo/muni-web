import { Flex } from "@chakra-ui/layout";
import { useEffect, useRef } from "react";
import { Application, Sprite } from "pixi.js";
import { useSize } from "web-api-hooks";
import { Spine } from "types/pixi-spine";
require("pixi.js");
require("pixi-spine");

export const Towaland = () => {
  const pixi = useRef<Application>();
  const parentRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(parentRef);

  useEffect(() => {
    pixi.current = new Application({ backgroundAlpha: 0, width, height });
    const { current: app } = pixi;
    parentRef.current.appendChild(app.view);

    app.loader
      .add("towa", "spine/spine_chara_0330001.json")
      .add("muni", "spine/spine_chara_0130001.json")
      .load((loader, resources) => {
        const towa = (new PIXI.spine.Spine(
          resources.towa.spineData
        ) as unknown) as Spine;
        const muni = (new PIXI.spine.Spine(
          resources.muni.spineData
        ) as unknown) as Spine;
        towa.skeleton.setSkinByName("normal");
        muni.skeleton.setSkinByName("reverse");
        muni.skeleton.findSlot("nose").setAttachment(null);
        muni.skeleton.findSlot("Rabbit ears_L(for)").setAttachment(null);
        muni.skeleton.findSlot("Rabbit ears_R(for)").setAttachment(null);
        const scaleT =
          towa.width * 2 > app.renderer.width
            ? 0.5
            : towa.height > app.renderer.height
            ? 0.8
            : 1;
        towa.scale.x = scaleT;
        towa.scale.y = scaleT;
        muni.scale.x = -1 * scaleT;
        muni.scale.y = scaleT;
        towa.x = 0.2 * app.renderer.width;
        towa.y = app.renderer.height;
        muni.x = 0.8 * app.renderer.width;
        muni.y = app.renderer.height;
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
  return <Flex w="full" flex="1" ref={parentRef}></Flex>;
};

export default Towaland;
