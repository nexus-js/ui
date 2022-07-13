export default class Toggle {
  constructor(state?: boolean);
  state: boolean;
  flip(state: any): void;
  on(): void;
  off(): void;
}
