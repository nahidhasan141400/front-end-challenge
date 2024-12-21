/* eslint-disable @typescript-eslint/no-explicit-any */
import { BackToHome } from "@/components/backToHome/backToHome";
import { headers } from "next/headers";
const UserAgentRoot = async () => {
  const headerList = headers();
  const user_agent = headerList.get("user_agent");

  return (
    <div>
      <BackToHome />

      {user_agent && (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>

          <div className="border p-2">{user_agent}</div>
        </div>
      )}

      {!user_agent && <div>No user agent</div>}
    </div>
  );
};

export default UserAgentRoot;
