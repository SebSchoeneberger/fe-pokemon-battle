function LeaderboardTable({ users }) {
    return (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Favorite Pokemon</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.username}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.avatar || "https://cdn-icons-png.flaticon.com/128/1144/1144760.png"}
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.username}</div>
                        <div className="text-sm opacity-50">{user.country || "Unknown"}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.favPokemon || "None"}</td>
                  <td>{user.score} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

export default LeaderboardTable;