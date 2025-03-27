import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";
import InterviewCard from "@/components/layout/interview.card";
import { getCurrentUser } from "@/lib/actions/auth.actions";

async function Home() {
    const user = await getCurrentUser();
    const userId = user?.id;

    let userInterviews: Interview[] = [];
    let allInterviews: Interview[] = [];

    if (userId) {
        const [userRes, allRes] = await Promise.all([
            getInterviewsByUserId(userId),
            getLatestInterviews({ userId }),
        ]);

        userInterviews = userRes ?? []; // Agar `null` bo‘lsa, bo‘sh massivga almashtiramiz
        allInterviews = allRes ?? []; // Agar `null` bo‘lsa, bo‘sh massivga almashtiramiz
    }

    const hasPastInterviews = userInterviews.length > 0;
    const hasUpcomingInterviews = allInterviews.length > 0;

    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                    <p className="text-lg">Practice real interview questions & get instant feedback</p>

                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>

                <Image
                    src="/robot.png"
                    alt="robo-dude"
                    width={400}
                    height={400}
                    priority
                    className="max-sm:hidden"
                />
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>

                <div className="interviews-section">
                    {hasPastInterviews ? (
                        userInterviews.map((interview) => (
                            <InterviewCard
                                key={interview.id}
                                userId={userId}
                                interviewId={interview.id}
                                role={interview.role}
                                type={interview.type}
                                techstack={interview.techstack}
                                createdAt={interview.createdAt}
                            />
                        ))
                    ) : (
                        <p>You haven&apos;t taken any interviews yet</p>
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take Interviews</h2>

                <div className="interviews-section">
                    {hasUpcomingInterviews ? (
                        allInterviews.map((interview) => (
                            <InterviewCard
                                key={interview.id}
                                userId={userId}
                                interviewId={interview.id}
                                role={interview.role}
                                type={interview.type}
                                techstack={interview.techstack}
                                createdAt={interview.createdAt}
                            />
                        ))
                    ) : (
                        <p>There are no interviews available</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default Home;
