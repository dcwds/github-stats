import { useEffect, useState } from "react"
import { GitHubUser } from "../../interfaces"
import { fetchGitHubUser } from "../../fetchers"

const useGitHubUser = (gitHubUsername: string) => {
  const [gitHubUser, setGitHubUser] = useState<GitHubUser>()
  const [status, setStatus] = useState<string>("idle")

  useEffect(() => {
    setStatus("loading")

    const getGitHubUser = async () => {
      try {
        const user = await fetchGitHubUser(gitHubUsername)

        setGitHubUser(user)
        setStatus("done")
      } catch (err) {
        setStatus("error")
      }
    }

    getGitHubUser()
  }, [gitHubUsername])

  return { gitHubUser, status }
}

export default useGitHubUser