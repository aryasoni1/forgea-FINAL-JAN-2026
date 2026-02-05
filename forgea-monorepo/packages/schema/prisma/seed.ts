import {
  AuditActorType,
  db,
  FailureClass,
  LabStatus,
  transitionLabSession,
} from "@forgea/schema";

async function main() {
  const user = await db.user.upsert({
    where: { email: "test@forgea.tech" },
    update: {},
    create: {
      email: "test@forgea.tech",
    },
  });

  const existingLab = await db.lab.findFirst({
    where: { title: "React Stale Closure" },
  });

  const lab =
    existingLab ??
    (await db.lab.create({
      data: {
        title: "React Stale Closure",
        epic: "React State Bugs",
        failureClass: FailureClass.STATE_CORRUPTION,
        sourceGithubIssueUrl:
          "https://github.com/aryasoni1/forgea-lab-001/issues/1",
        repoVersion: "v1",
        baseRepoUrl: "https://github.com/aryasoni1/forgea-lab-001",
        constraints: {
          stack: "react",
          language: "typescript",
        },
      },
    }));

  const existingSession = await db.labSession.findFirst({
    where: {
      userId: user.id,
      labId: lab.id,
      userForkUrl: "https://github.com/aryasoni1/forgea-lab-001",
    },
  });

  if (!existingSession) {
    const created = await db.labSession.create({
      data: {
        userId: user.id,
        labId: lab.id,
        userForkUrl: "https://github.com/aryasoni1/forgea-lab-001",
      },
    });

    await transitionLabSession({
      sessionId: created.id,
      from: [LabStatus.IN_PROGRESS],
      to: LabStatus.STUCK,
      actor: {
        id: "seed",
        type: AuditActorType.SYSTEM,
      },
      reason: "seed_data",
    });
  }
}

main()
  .then(() => db.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
