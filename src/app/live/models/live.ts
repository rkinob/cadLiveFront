import { LiveItem } from "./liveItem";

export class Live {
  idLive: string;
  titulo: string;
  idStatus: string;
  dsStatus: string;
  dtInclusao: Date
  liveItems: LiveItem[];
}
