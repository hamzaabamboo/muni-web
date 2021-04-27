import { join } from "path";
import { BuildTargets, bundle } from "@mitm/assetbundlecompiler";

const { WebGL } = BuildTargets;

export const yankLive2D = async () => {
  const url = join(
    __dirname,
    "../d4dj-dumps/AssetBundles/Android/ondemand_live2d_chara_330001"
  );
  // bundle() is the entry function to the API.
  // Pass a list of assets to bundle into the resulting asset bundle.
  // Those assets could be anywhere on the filesystem.
  // To pass an array of paths, use bundle(...paths) syntax.
  await bundle("/abs/path/to/fbx", "/abs/path/to/texture" /* ... */)
    // .targeting() is mandatory and tells the library what platform your asset bundle targets.
    // You can either pass a predefined constant in BuildTargets, or a string,
    // matching the name of a member of the UnityEditor.BuildTarget enum.
    // @see https://docs.unity3d.com/ScriptReference/BuildTarget.html
    .targeting(WebGL)

    // Lets you install custom Editor scripts before asset bundle generation.
    // This is very useful, for example, to create an Asset Postprocessor to customize how
    // your resources are imported into the asset bundle, using AssetImporters for example.
    // @see https://docs.unity3d.com/ScriptReference/AssetPostprocessor.html
    .includingEditorScripts("/abs/path/to/script.dll", "/abs/path/to/script.cs")

    // Lets you define build options. Those are always flags, and the key names represent
    // member names of the UnityEditor.BuildAssetBundleOptions enum.
    // @see https://docs.unity3d.com/ScriptReference/BuildAssetBundleOptions.html
    .withBuildOptions({
      chunkBasedCompression: true,
      strictMode: true /* etc */,
    })

    // This lets you define a simple logger to get simple text updates about the conversion.
    .withLogger((message) => console.log(message))

    // This lets you define a logger for the real-time output of Unity (stdout+stderr).
    // Beware, it's very verbose :)
    .withUnityLogger((message) => console.log(`Unity: ${message}`))

    // This is the "run" function and marks the termination of the fluent calls
    // by returning a Promise that resolves when the asset bundle generation ends.
    // Give it a path to the asset bundle name or a fs.WriteStream.
    .to("/abs/path/to/resources.assetbundle");
};

const main = () => {
  yankLive2D();
};

main();
