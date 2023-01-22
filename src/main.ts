import * as core from '@actions/core'
import { fetchStatus } from './fetchStatus'
import { updateStatus } from './updateStatus'

async function run(): Promise<void> {
  try {
    const omgLolUser = core.getInput('omg lol user');
    const { emoji, message } = await fetchStatus(`https://api.omg.lol/address/${omgLolUser}/statuses/latest`)

    const userToken = core.getInput('github token');
    await updateStatus(userToken, emoji, message)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()