"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Search, Grid3X3, List, Heart, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface AIImage {
  id: string
  title: string
  url: string
  prompt: string
  model: string
  tags: string[]
  likes: number
  downloads: number
  createdAt: string
}

const sampleImages: AIImage[] = [
  {
    id: "1",
    title: "Cyberpunk Cityscape",
    url: "/placeholder.svg?height=400&width=400",
    prompt: "A futuristic cyberpunk cityscape with neon lights and flying cars",
    model: "DALL-E 3",
    tags: ["cyberpunk", "futuristic", "neon", "city"],
    likes: 142,
    downloads: 89,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Abstract Digital Art",
    url: "/placeholder.svg?height=400&width=400",
    prompt: "Abstract digital art with flowing geometric patterns and vibrant colors",
    model: "Midjourney",
    tags: ["abstract", "digital", "geometric", "colorful"],
    likes: 98,
    downloads: 67,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Ethereal Portrait",
    url: "/placeholder.svg?height=400&width=400",
    prompt: "Ethereal portrait of a woman surrounded by glowing light particles",
    model: "Stable Diffusion",
    tags: ["portrait", "ethereal", "glowing", "artistic"],
    likes: 203,
    downloads: 156,
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    title: "Cosmic Landscape",
    url: "/placeholder.svg?height=400&width=400",
    prompt: "A cosmic landscape with nebulas, stars, and distant galaxies",
    model: "DALL-E 3",
    tags: ["cosmic", "space", "nebula", "stars"],
    likes: 167,
    downloads: 134,
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    title: "Minimalist Architecture",
    url: "/placeholder.svg?height=400&width=400",
    prompt: "Minimalist modern architecture with clean lines and natural lighting",
    model: "Midjourney",
    tags: ["architecture", "minimalist", "modern", "clean"],
    likes: 89,
    downloads: 45,
    createdAt: "2024-01-11",
  },
  {
    id: "6",
    title: "Fantasy Forest",
    url: "/placeholder.svg?height=400&width=400",
    prompt: "A magical fantasy forest with glowing mushrooms and mystical creatures",
    model: "Stable Diffusion",
    tags: ["fantasy", "forest", "magical", "mystical"],
    likes: 234,
    downloads: 189,
    createdAt: "2024-01-10",
  },
]

export default function HomePage() {
  const [images, setImages] = useState<AIImage[]>(sampleImages)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedImage, setSelectedImage] = useState<AIImage | null>(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const filteredImages = images.filter(
    (image) =>
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      image.prompt.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // Handle file upload logic here
      console.log("Files selected:", files)
      setIsUploadOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">AI Gallery</h1>
                <p className="text-sm text-slate-500">Your creative AI image collection</p>
              </div>
            </div>

            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload AI Images</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Drag and drop your AI images here</p>
                    <p className="text-sm text-slate-400 mb-4">or click to browse</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer bg-transparent">
                        Choose Files
                      </Button>
                    </label>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Search and Controls */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search images, prompts, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/70 backdrop-blur-sm border-slate-200 rounded-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")}>
              <TabsList className="bg-white/70 backdrop-blur-sm">
                <TabsTrigger value="grid" className="rounded-full">
                  <Grid3X3 className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="rounded-full">
                  <List className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Image Gallery */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              className="group bg-white/70 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => setSelectedImage(image)}
            >
              <CardContent className="p-0">
                {viewMode === "grid" ? (
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {image.likes}
                        </span>
                        <span className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {image.downloads}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex p-4 space-x-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.title}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-slate-900 mb-1">{image.title}</h3>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">{image.prompt}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {image.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>{image.model}</span>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {image.likes}
                          </span>
                          <span className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            {image.downloads}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No images found</h3>
            <p className="text-slate-500">Try adjusting your search terms or upload some new images.</p>
          </div>
        )}
      </div>

      {/* Image Detail Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedImage && (
            <div className="space-y-6">
              <div className="relative">
                <Image
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.title}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedImage.title}</h2>
                    <p className="text-slate-600">{selectedImage.prompt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      {selectedImage.likes}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Model:</span>
                    <span className="ml-2 text-slate-600">{selectedImage.model}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Created:</span>
                    <span className="ml-2 text-slate-600">{selectedImage.createdAt}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Downloads:</span>
                    <span className="ml-2 text-slate-600">{selectedImage.downloads}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Likes:</span>
                    <span className="ml-2 text-slate-600">{selectedImage.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
