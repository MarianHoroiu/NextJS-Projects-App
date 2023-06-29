import TaskCard from "@/components/TaskCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const getData = async id => {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id, ownerId: user.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

// all pages rendered from a dynamic folder will gat a params prop
// in this case, we're destructuring the id from params
export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getData(params.id);

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <TaskCard tasks={project?.tasks} title={project?.name} />
    </div>
  );
}
