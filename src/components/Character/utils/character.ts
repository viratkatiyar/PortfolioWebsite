import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF | null> => {
    try {
      const encryptedBlob = await decryptFile(
        "/models/character.enc",
        "Character3D#@"
      );
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

      return new Promise((resolve, reject) => {
        loader.load(
          blobUrl,
          async (gltf) => {
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.frustumCulled = true;
              }
            });
            setCharTimeline(character, camera);
            setAllTimeline();
            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;
            dracoLoader.dispose();
            resolve(gltf);
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { loadCharacter };
};

export default setCharacter;
