import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async list(projectId: string, userId: string) {
    await this.verifyAccess(projectId, userId);

    return this.prisma.projectFile.findMany({
      where: { projectId, deletedAt: null },
      orderBy: { path: 'asc' },
      select: {
        id: true,
        path: true,
        language: true,
        size: true,
        updatedAt: true,
      },
    });
  }

  async get(fileId: string, userId: string) {
    const file = await this.prisma.projectFile.findFirst({
      where: { id: fileId, project: { ownerId: userId } },
    });

    if (!file) throw new NotFoundException('File not found');

    return file;
  }

  async create(projectId: string, userId: string, data: { path: string; content?: string; language?: string }) {
    await this.verifyAccess(projectId, userId);

    const existing = await this.prisma.projectFile.findUnique({
      where: { projectId_path: { projectId, path: data.path } },
    });

    if (existing) {
      throw new Error('File already exists at this path');
    }

    return this.prisma.projectFile.create({
      data: {
        projectId,
        path: data.path,
        content: data.content || '',
        language: data.language,
        size: (data.content || '').length,
      },
    });
  }

  async update(fileId: string, userId: string, data: { content?: string; path?: string }) {
    const file = await this.prisma.projectFile.findFirst({
      where: { id: fileId, project: { ownerId: userId } },
    });

    if (!file) throw new NotFoundException('File not found');

    return this.prisma.projectFile.update({
      where: { id: fileId },
      data: {
        ...data,
        size: data.content ? data.content.length : undefined,
      },
    });
  }

  async delete(fileId: string, userId: string) {
    const file = await this.prisma.projectFile.findFirst({
      where: { id: fileId, project: { ownerId: userId } },
    });

    if (!file) throw new NotFoundException('File not found');

    await this.prisma.projectFile.update({
      where: { id: fileId },
      data: { deletedAt: new Date() },
    });

    return { success: true };
  }

  private async verifyAccess(projectId: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, ownerId: userId },
    });

    if (!project) throw new NotFoundException('Project not found');
  }
}
