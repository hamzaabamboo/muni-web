import { Flex } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { Application, Ticker } from "pixi.js";
import { useSize } from "web-api-hooks";
import { Cubism4ModelSettings, Live2DModel } from "pixi-live2d-display";
import "pixi-spine";
import {
  ButtonGroup,
  Button,
  IconButton,
  Select,
  Text,
} from "@chakra-ui/react";

export const Towaland = () => {
  const pixi = useRef<Application>();
  const parentRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(parentRef);
  const [mode, setMode] = useState<0 | 1>(0);
  const [pose, setPose] = useState("hello");

  const towaLive2d = useRef<Live2DModel>();
  const muniLive2d = useRef<Live2DModel>();

  useEffect(() => {
    pixi.current = new Application({
      transparent: true,
      width,
      height,
      autoStart: true,
    });
    const { current: app } = pixi;
    Live2DModel.registerTicker(Ticker);
    parentRef.current.appendChild(app.view);

    const init = async () => {
      const resources: any = await new Promise((resolve) =>
        app.loader
          .add("towa", "spine/spine_chara_0330001.json")
          .add("muni", "spine/spine_chara_0130001.json")
          .load((loader, resources) => {
            resolve(resources);
          })
      );
      if (mode === 0) {
        const towa = new PIXI.spine.Spine(resources.towa.spineData);
        const muni = new PIXI.spine.Spine(resources.muni.spineData);
        towa.skeleton.setSkinByName("normal");
        muni.skeleton.setSkinByName("reverse");
        muni.skeleton.findSlot("nose").setAttachment(null);
        muni.skeleton.findSlot("Rabbit ears_L(for)").setAttachment(null);
        muni.skeleton.findSlot("Rabbit ears_R(for)").setAttachment(null);
        const scaleT =
          towa.width * 2 > app.renderer.width
            ? app.renderer.width / 2 / towa.width
            : towa.height > app.renderer.height
            ? app.renderer.height / towa.height
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
        muni.state.setAnimation(0, "07_talk_B", true); // interaction

        app.stage.addChild(towa);
        app.stage.addChild(muni);
      } else {
        towaLive2d.current = await Live2DModel.from(
          "live2d/towa/resources.model3.json"
        );
        muniLive2d.current = await Live2DModel.from(
          "live2d/muni/resources.model3.json"
        );
        // transforms
        towaLive2d.current.x = 0.25 * app.renderer.width;
        towaLive2d.current.y = (9 * app.renderer.height) / 10;
        towaLive2d.current.rotation = Math.PI;
        towaLive2d.current.skew.x = Math.PI;
        towaLive2d.current.scale.set(0.5, 0.5);
        towaLive2d.current.anchor.set(0.5, 0.5);

        muniLive2d.current.x = 0.75 * app.renderer.width;
        muniLive2d.current.y = (9 * app.renderer.height) / 10;
        muniLive2d.current.rotation = Math.PI;
        muniLive2d.current.skew.x = Math.PI;
        muniLive2d.current.scale.set(0.5, 0.5);
        muniLive2d.current.anchor.set(0.5, 0.5);

        towaLive2d.current.internalModel.motionManager.startRandomMotion("");
        muniLive2d.current.internalModel.motionManager.startRandomMotion("");
        app.stage.addChild(towaLive2d.current);
        app.stage.addChild(muniLive2d.current);
      }
    };
    init();
    return () => {
      parentRef.current?.removeChild(app.view);
      //   app.destroy();
    };
  }, [width, height, mode]);

  useEffect(() => {
    if (towaLive2d.current && muniLive2d.current) {
      towaLive2d.current?.motion("", getPose(towaLive2d.current, pose));
      muniLive2d.current?.motion("", getPose(muniLive2d.current, pose));
    }
    return () => {
      towaLive2d.current?.internalModel.motionManager.stopAllMotions();
      muniLive2d.current?.internalModel.motionManager.stopAllMotions();
    };
  }, [pose]);
  return (
    <>
      <Flex flexDir={["column", null, "row"]} alignItems="center">
        <ButtonGroup isAttached variant="solid">
          <Button
            colorScheme={mode === 0 ? "blue" : "whitealpha"}
            variant={mode === 0 ? "solid" : "outline"}
            onClick={() => setMode(0)}
          >
            Spine
          </Button>
          <Button
            colorScheme={mode === 1 ? "blue" : "whitealpha"}
            variant={mode === 1 ? "solid" : "outline"}
            onClick={() => setMode(1)}
          >
            Live2D
          </Button>
        </ButtonGroup>
        {mode === 1 && (
          <Flex alignItems="center" px={2}>
            <Text whiteSpace="nowrap">Pose</Text>
            <Select
              onChange={(v) => setPose(v.currentTarget.value)}
              value={pose}
            >
              {[
                "idle",
                "happy",
                "sad",
                "angry",
                "dance",
                "yes",
                "no",
                "cry",
                "amazed",
                "shame",
                "think",
                "question",
                "performance",
                "waver",
                "panic",
              ].map((pose) => (
                <option value={pose} key={pose}>
                  {pose}
                </option>
              ))}
            </Select>
            <Text whiteSpace="nowrap">(Doesn't make sense though)</Text>
          </Flex>
        )}
      </Flex>
      <Flex w="full" flex="1" ref={parentRef}></Flex>
    </>
  );
};

export default Towaland;

const getPose = (model: Live2DModel, pose: string) => {
  return (
    (model.internalModel.settings as Cubism4ModelSettings).motions[""]
      .map((p, idx) => (p.File.match(pose) ? idx : undefined))
      .filter((p) => p)[0] ?? 0
  );
};
