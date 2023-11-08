import { Test, TestingModule } from '@nestjs/testing';
import { ArtController } from '../src/controller/art.controller';
import { ArtService } from '../src/service/art.service';

describe('AppController', () => {
  let appController: ArtController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ArtController],
      providers: [ArtService],
    }).compile();

    appController = app.get<ArtController>(ArtController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
