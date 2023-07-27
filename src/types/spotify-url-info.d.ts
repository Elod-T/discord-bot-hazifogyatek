declare module "spotify-url-info" {
  interface SpotifyUrlInfo {
    title: string;
    type: "track" | "playlist" | "album" | "artist" | "episode";
    track: string;
    artist: string;
    image: string;
    audio: string;
    link: string;
    embed: string;
    date: string;
    description: string;
  }

  interface Spotify {
    getTracks(url: string): Promise<SpotifyUrlInfo[]>;
  }

  export default function spotifyUrlInfo(
    fetch: (
      input: RequestInfo | URL,
      init?: RequestInit | undefined
    ) => Promise<Response>
  ): Spotify;
}
