// app/actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateProgress(userId: string, day: number, completed: boolean) {
  await prisma.userProgress.upsert({
    where: { userId_day: { userId, day } },
    update: { completed },
    create: { userId, day, completed }
  })
  revalidatePath(`/modules/${day}`)
  revalidatePath('/home')
}

export async function updateChecklist(userId: string, day: number, tasks: boolean[]) {
  await prisma.checklist.upsert({
    where: { userId_day: { userId, day } },
    update: { tasks },
    create: { userId, day, tasks }
  })
  revalidatePath('/checklist')
}

export async function fetchUserProgress(userId: string) {
  return await prisma.userProgress.findMany({ where: { userId } })
}

export async function fetchUserChecklists(userId: string) {
  return await prisma.checklist.findMany({ where: { userId } })
}

export async function markDayAsCompleted(userId: string, day: number, completed: boolean) {
  try {
    await prisma.userProgress.upsert({
      where: { userId_day: { userId, day } },
      update: { completed },
      create: { userId, day, completed }
    })
    revalidatePath(`/modules/${day}`)
    revalidatePath('/home')
    return { success: true }
  } catch (error) {
    console.error('Error marking day as completed:', error)
    throw error
  }
}