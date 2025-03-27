import {getCurrentUser} from "@/lib/actions/auth.actions";
import Agent from "@/components/layout/agent";


const InterViewPage = async () => {
    const user = await getCurrentUser();

    return (
        <>
            <h3>Interview generation</h3>

            <Agent
                userName={user?.name || "User"}
                userId={user?.id}
                type="generate"
            />
        </>
    );
};

export default InterViewPage;