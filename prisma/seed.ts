import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const root = await prisma.user.upsert({
    where: { email: 'user@root.com' },
    update: {},
    create: {
      email: 'user@root.com',
      name: 'Alice',
      language: 'fr',
      role: 'ROOT',
      password: await hash('root', 10),
    },
  });
  console.log({ root });

  const beds = [];
  for (const level of [1, 2, 3, 4]) {
    for (const number of [1, 2, 3, 4, 5, 6, 7, 8]) {
      const bed = await prisma.bed.upsert({
        where: {
          number_level: {
            number,
            level,
          },
        },
        update: {},
        create: {
          number,
          level,
        },
      });
      beds.push(bed);
    }
  }

  console.log({ beds });

  const equipmentsPayload = [
    {
      name: 'Stethoscope',
      description: 'Mesure la pression artériel',
      serialNumber: 11111,
    },
    {
      name: 'Électro-Cardiographe',
      description: 'Mesure les battements du coeur',
      serialNumber: 22222,
    },
    {
      name: 'Sonde Globule rouge',
      description: 'Mesure les taux de globule rouge',
      serialNumber: 3333,
    },
    {
      name: 'Sonde Globule Blanche',
      description: 'Mesure les taux de globule blanc',
      serialNumber: 4444,
    },
  ];

  const equipments = [];

  for (const payload of equipmentsPayload) {
    const equipment = await prisma.equipment.upsert({
      where: {
        serialNumber: payload.serialNumber,
      },
      update: {},
      create: payload,
    });
    equipments.push(equipment);
  }

  console.log({ equipments });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
