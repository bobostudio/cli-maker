import { promisify } from 'util'
import download from 'download-git-repo'
import ora from 'ora'

export default async (repo, dest) => {
    const loading = ora(`下载 ${repo} 中.....`)
    loading.start();
    await promisify(download)(repo, dest);
    loading.succeed();
}