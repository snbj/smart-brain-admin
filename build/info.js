import boxen from 'boxen';
import { readdir, stat } from "node:fs";
import { sum, formatBytes } from "@pureadmin/utils";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import gradient from "gradient-string";

dayjs.extend(duration);

let config,
    startTime,
    endTime,
    outDir;

const boxenOptions = {
    padding: 0.5,
    borderColor: "cyan",
    borderStyle: "round"
};

const welcomeMessage = gradient(["cyan", "magenta"]).multiline(
    `您好! 欢迎使用 smart-brain 开源项目`
);
const fileListTotal = [];

const getPackageSize = options => {
    const { folder = "dist", callback, format = true } = options;
    readdir(folder, (err, files) => {
        if (err) throw err;
        let count = 0;
        const checkEnd = () => {
            ++count == files.length &&
                callback(format ? formatBytes(sum(fileListTotal)) : sum(fileListTotal));
        };
        files.forEach((item) => {
            stat(`${folder}/${item}`, async (err, stats) => {
                if (err) throw err;
                if (stats.isFile()) {
                    fileListTotal.push(stats.size);
                    checkEnd();
                } else if (stats.isDirectory()) {
                    getPackageSize({
                        folder: `${folder}/${item}/`,
                        callback: checkEnd
                    });
                }
            });
        });
        files.length === 0 && callback(0);
    });
};


export default {
    name: 'info-message',
    configResolved(resolvedConfig) {
        config = resolvedConfig;
        outDir = resolvedConfig.build?.outDir ?? "dist";
    },
    buildStart(e) {
        console.log(boxen(welcomeMessage, boxenOptions));
        if (config.command === "build") {
            startTime = dayjs(new Date());
        }
    },
    closeBundle() {
        if (config.command === "build") {
            endTime = dayjs(new Date());
            getPackageSize({
                folder: outDir,
                callback: (size) => {
                    console.log(
                        boxen(
                            gradient(["cyan", "magenta"]).multiline(
                                `🎉 恭喜打包完成（总用时${dayjs
                                    .duration(endTime.diff(startTime))
                                    .format("mm分ss秒")}，打包后的大小为${size}）`
                            ),
                            boxenOptions
                        )
                    );
                }
            });
        }
    }
}