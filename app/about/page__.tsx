import db from "@/utils/db";

async function AboutPage() {
  const profile = await db.testProfile.create({
    data: {
      name: "Simbad",
    },
  });
  const users = await db.testProfile.findMany();

  return (
    <div>
      {users.map((u) => {
        return (
          <h2 className="text-2xl font-bold" key={u.id}>
            {u.name}
          </h2>
        );
      })}
    </div>
  );
}

export default AboutPage;
