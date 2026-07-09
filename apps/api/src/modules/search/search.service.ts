import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly prisma: PrismaService) {}

  async search(userId: string, query: string) {
    if (!query || query.length < 2) return { projects: [], files: [] };

    const [projects, files] = await Promise.all([
      this.prisma.project.findMany({
        where: {
          ownerId: userId,
          deletedAt: null,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 10,
        select: {
          id: true,
          name: true,
          type: true,
          thumbnailUrl: true,
          updatedAt: true,
        },
      }),
      this.prisma.projectFile.findMany({
        where: {
          project: { ownerId: userId, deletedAt: null },
          OR: [
            { path: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 10,
        select: {
          id: true,
          path: true,
          language: true,
          project: { select: { id: true, name: true } },
        },
      }),
    ]);

    return { projects, files };
  }
}
