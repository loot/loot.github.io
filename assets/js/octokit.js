import { Octokit as RealOctokit } from '@octokit/rest';
import { throttling } from '@octokit/plugin-throttling';

export const Octokit = RealOctokit.plugin(throttling);
