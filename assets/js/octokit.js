import { Octokit as RealOctokit } from '@octokit/rest';
import { throttling } from '@octokit/plugin-throttling';

export function Octokit(options) {
    const ThrottledOctokit = RealOctokit.plugin(throttling);

    return new ThrottledOctokit({
        throttle: {
            onRateLimit: (retryAfter, options) => {
                console.warn(
                    `Request quota exhausted for request ${options.method} ${options.url}`,
                );

                console.info(`Retrying after ${retryAfter} seconds!`);
                return true;
            },
            onSecondaryRateLimit: (retryAfter, options) => {
                console.warn(
                    `SecondaryRateLimit detected for request ${options.method} ${options.url}`,
                );

                console.info(`Retrying after ${retryAfter} seconds!`);
                return true;
            }
        },
        ...options
    });
}
