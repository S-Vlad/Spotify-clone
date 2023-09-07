"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("../config");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(config_1.default.port, () => console.log('server started'));
};
bootstrap();
//# sourceMappingURL=main.js.map