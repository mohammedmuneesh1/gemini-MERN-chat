import ImageKit from "imagekit";
const imageKitIOClient = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});
export default imageKitIOClient;
//# sourceMappingURL=imagekitIO.js.map