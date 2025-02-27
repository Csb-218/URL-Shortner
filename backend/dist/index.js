"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const urls_1 = require("./src/routes/urls");
const routes_1 = __importDefault(require("./src/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", routes_1.default);
app.use("/api", urls_1.URLRouter);
const PORT = process.env.PORT || 3000;
const uri = process.env.DB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            yield mongoose_1.default.connect(uri, clientOptions);
            if (mongoose_1.default.connection.db) {
                yield mongoose_1.default.connection.db.admin().command({ ping: 1 });
                console.log("Pinged your deployment. You successfully connected to MongoDB!");
                app.listen(PORT, () => {
                    console.log(`Server running on port ${PORT}`);
                });
            }
            else {
                throw new Error("Database connection is undefined");
            }
        }
        finally {
            // Ensures that the client will close when you finish/error
            yield mongoose_1.default.disconnect();
        }
    });
}
run().catch(console.dir);
