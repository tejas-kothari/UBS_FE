export abstract class D3Chart {
  constructor(public element: HTMLElement) {}

  abstract update(): void;
}
