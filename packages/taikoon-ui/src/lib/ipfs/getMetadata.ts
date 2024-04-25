import Token from '../token';
import { IPFS_GATEWAY } from './config';
import get from './get';
export interface ITokenMetadata {
  name: string;
  description: string;
  image: string;
}
export default async function getMetadata(tokenId: number): Promise<ITokenMetadata> {
  const tokenURI = await Token.tokenURI(tokenId);
  const hash = tokenURI.split('ipfs://').pop();
  if (!hash) throw new Error('Invalid token URI:' + tokenURI);
  const metadata = (await get(hash, true)) as ITokenMetadata;

  const imageHash = metadata.image.split('ipfs://').pop();

  if (!imageHash) throw new Error('Invalid image URI:' + metadata.image);

  return {
    ...metadata,
    image: `${IPFS_GATEWAY}${imageHash}`,
  };
}