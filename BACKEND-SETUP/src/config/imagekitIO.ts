import ImageKit from "imagekit";

const imageKitIOClient = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT as string,
});

export default imageKitIOClient;