import { GraphMonth } from "../../interfaces"
import { useContext } from "react"
import { StatsContext } from "./gh-stats-context"
import * as R from "ramda"

const getCommitCountColor = (count: number): string => {
  if (count === 0) return "#161b22"
  if (count < 3) return "#0e4429"
  if (count < 5) return "#006d32"
  if (count < 10) return "#26a641"
  else return "#39d353"
}

const Cell = ({ date, commitCount }: { date: Date; commitCount: number }) => (
  <div
    className="has-tooltip cursor-pointer"
    style={{ backgroundColor: getCommitCountColor(commitCount) }}
  >
    <div className="tooltip bg-black p-2 rounded shadow text-xs">
      <p>
        <strong className="text-white">
          {!!commitCount ? commitCount : "No"} commit
          {commitCount !== 1 ? "s" : ""}
        </strong>{" "}
        on {date.toDateString()}
      </p>

      <div className="arrow-down"></div>
    </div>
  </div>
)

const UserCommits = () => {
  const {
    filteredCommits: commits,
    commitDates,
    monthMarkers
  } = useContext(StatsContext)

  return (
    <div className="p-4">
      <h3>Commits</h3>
      <p>
        They have made {!!commits.length ? commits.length : "no"} commit
        {commits.length !== 1 ? "s" : ""}.
      </p>

      {!!commits.length && (
        <div className="mt-4">
          <div
            className="graph-months"
            style={{
              gridTemplateColumns: `2.3em repeat(${Math.ceil(
                commitDates.length / 7
              )}, 1fr)`
            }}
          >
            {
              // this div is required as an offset, as weekdays sit in this
              // position later in the graph
            }
            <div></div>

            {R.addIndex<GraphMonth>(R.map)(
              ({ month, start, end }, idx) => (
                // 2 is added to start and end values because of the weekdays
                // offset and the graph months data using an index of 0
                <div
                  key={idx}
                  style={{ gridColumn: `${start + 2} / ${end + 2}` }}
                >
                  {month}
                </div>
              ),
              monthMarkers
            )}
          </div>

          <div className="graph-content">
            <div className="graph-days">
              <div></div>
              <div>mon</div>
              <div></div>
              <div>wed</div>
              <div></div>
              <div>fri</div>
              <div></div>
            </div>

            <div arial-label="graph dates" className="graph-dates">
              {R.map(
                (d) => (
                  <Cell key={d.date.toDateString()} {...d} />
                ),
                commitDates
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserCommits
