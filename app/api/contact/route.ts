import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json')

// Ensure data directory and file exist
async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {
    // Directory might already exist
  }

  try {
    await fs.access(MESSAGES_FILE)
  } catch {
    // File doesn't exist, create empty array
    await fs.writeFile(MESSAGES_FILE, JSON.stringify([], null, 2))
  }
}

// GET - Retrieve all messages (optional: filter by status)
export async function GET(request: Request) {
  await ensureDataFile()

  try {
    const fileContent = await fs.readFile(MESSAGES_FILE, 'utf-8')
    const messages = JSON.parse(fileContent)

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    if (status) {
      return NextResponse.json(messages.filter((m: any) => m.status === status))
    }

    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 })
  }
}

// POST - Create new message
export async function POST(request: Request) {
  await ensureDataFile()

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { error: 'Name, phone, and message are required' },
        { status: 400 }
      )
    }

    // Create new message
    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: body.name,
      phone: body.phone,
      service: body.service || '',
      message: body.message,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: ''
    }

    // Read existing messages
    const fileContent = await fs.readFile(MESSAGES_FILE, 'utf-8')
    const messages = JSON.parse(fileContent)

    // Add new message
    messages.unshift(newMessage)

    // Write back to file
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Mesaj trimis cu succes!'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    )
  }
}

// PATCH - Update message status or notes
export async function PATCH(request: Request) {
  await ensureDataFile()

  try {
    const body = await request.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      )
    }

    const fileContent = await fs.readFile(MESSAGES_FILE, 'utf-8')
    const messages = JSON.parse(fileContent)

    const messageIndex = messages.findIndex((m: any) => m.id === id)

    if (messageIndex === -1) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }

    // Update fields
    if (status) messages[messageIndex].status = status
    if (notes !== undefined) messages[messageIndex].notes = notes
    messages[messageIndex].updatedAt = new Date().toISOString()

    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2))

    return NextResponse.json({ success: true, message: messages[messageIndex] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    )
  }
}

// DELETE - Remove a message
export async function DELETE(request: Request) {
  await ensureDataFile()

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      )
    }

    const fileContent = await fs.readFile(MESSAGES_FILE, 'utf-8')
    const messages = JSON.parse(fileContent)

    const filteredMessages = messages.filter((m: any) => m.id !== id)

    if (filteredMessages.length === messages.length) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }

    await fs.writeFile(MESSAGES_FILE, JSON.stringify(filteredMessages, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}
