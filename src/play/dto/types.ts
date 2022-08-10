export enum Position {
  BASE = 'BASE',
  ESCOLTA = 'ESCOLTA',
  ALERO = 'ALERO',
  ALAPIVOT = 'ALAPIVOT',
  PIVOT = 'PIVOT',
}

export type Instruction = {
  xstart: number;
  ystart: number;
  xend: number;
  yend: number;
  time: number;
};
