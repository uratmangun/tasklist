import React, { useState } from 'react'
import { Check, Plus, BarChart3, User, LogIn, LogOut, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react'

interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  priority: 'low' | 'medium' | 'high'
}

export default function HomePage() {
  const { user } = useUser()
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      completed: false,
      createdAt: new Date(),
      priority: 'high'
    },
    {
      id: '2',
      title: 'Review team feedback',
      completed: true,
      createdAt: new Date(Date.now() - 86400000),
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Update documentation',
      completed: false,
      createdAt: new Date(Date.now() - 172800000),
      priority: 'low'
    }
  ])
  
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        completed: false,
        createdAt: new Date(),
        priority
      }
      setTasks([task, ...tasks])
      setNewTask('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const completedCount = tasks.filter(task => task.completed).length
  const activeCount = tasks.filter(task => !task.completed).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <>
      {/* Content shown when user is signed out */}
      <SignedOut>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Welcome to TaskFlow</CardTitle>
              <p className="text-muted-foreground">
                Sign in to manage your tasks and stay organized
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <SignInButton mode="modal">
                <Button className="w-full" size="lg">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
              <div className="text-center text-sm text-muted-foreground">
                <p>✓ Sync across devices</p>
                <p>✓ Priority management</p>
                <p>✓ Progress tracking</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SignedOut>

      {/* Content shown when user is signed in */}
      <SignedIn>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <div className="border-b border-border bg-card">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h1 className="text-xl font-semibold text-foreground">TaskFlow</h1>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{user?.firstName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground hidden sm:block">{user?.firstName || 'User'}</span>
                  <SignOutButton>
                    <Button variant="ghost" size="sm">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </SignOutButton>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Task Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Add Task */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Task</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="What needs to be done?"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                        className="flex-1"
                      />
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                        className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <Button onClick={addTask}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Task Filters */}
                <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | 'active' | 'completed')}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <TabsContent value={filter} className="mt-6">
                    <Card>
                      <CardContent className="p-0">
                        {filteredTasks.length === 0 ? (
                          <div className="p-8 text-center text-muted-foreground">
                            <Check className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No tasks found</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-border">
                            {filteredTasks.map((task) => (
                              <div key={task.id} className="p-4 flex items-center space-x-3 hover:bg-muted/50 transition-colors">
                                <button
                                  onClick={() => toggleTask(task.id)}
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                    task.completed
                                      ? 'bg-primary border-primary text-primary-foreground'
                                      : 'border-border hover:border-primary'
                                  }`}
                                >
                                  {task.completed && <Check className="w-3 h-3" />}
                                </button>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                    {task.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {task.createdAt.toLocaleDateString()}
                                  </p>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteTask(task.id)}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Tasks</span>
                      <Badge variant="secondary">{tasks.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active</span>
                      <Badge variant="outline">{activeCount}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <Badge variant="default">{completedCount}</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">
                        {tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Priority Legend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Priority Levels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm text-foreground">High Priority</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-sm text-foreground">Medium Priority</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm text-foreground">Low Priority</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  )
}