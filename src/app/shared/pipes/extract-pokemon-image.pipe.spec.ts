import { ExtractPokemonImagePipe } from './extract-pokemon-image.pipe';

describe('ExtractPokemonImagePipe', () => {
  it('create an instance', () => {
    const pipe = new ExtractPokemonImagePipe();
    expect(pipe).toBeTruthy();
  });
});
