"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTools } from "@/lib/tools-context";
import { BookmarkIcon, Lock } from "lucide-react";
import { useState } from "react";
import { Tool } from "@/types";
import { TagSelector } from "./tag-selector";
import { useAuth } from "@/hooks/use-auth";
import { AdminLoginDialog } from "./admin-login-dialog";

export function AddToolDialog() {
  const { addTool } = useTools();
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    tags: [] as string[],
    url: "",
    tutorial: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTool: Omit<Tool, "id"> = {
      name: formData.name,
      description: formData.description,
      category: formData.category as Tool["category"],
      price: formData.price as Tool["price"],
      tags: formData.tags,
      url: formData.url,
      tutorial: formData.tutorial,
      favorite: false,
    };
    addTool(newTool);
    setOpen(false);
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      tags: [],
      url: "",
      tutorial: "",
    });
  };

  const handleClick = () => {
    if (!isAdmin) {
      setShowLoginDialog(true);
    }
  };

  return (
    <>
      <Dialog open={open && isAdmin} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={handleClick}>
            {isAdmin ? (
              <BookmarkIcon className="mr-2 h-4 w-4" />
            ) : (
              <Lock className="mr-2 h-4 w-4" />
            )}
            新規ツール追加
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>新規AIツール追加</DialogTitle>
              <DialogDescription>
                新しいAIツールをコレクションに追加します。以下の詳細を入力してください。
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">名前</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">説明</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">カテゴリー</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="テキスト生成">テキスト生成</SelectItem>
                    <SelectItem value="画像生成">画像生成</SelectItem>
                    <SelectItem value="音声処理">音声処理</SelectItem>
                    <SelectItem value="動画作成">動画作成</SelectItem>
                    <SelectItem value="データ分析">データ分析</SelectItem>
                    <SelectItem value="その他">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">価格</Label>
                <Select
                  value={formData.price}
                  onValueChange={(value) =>
                    setFormData({ ...formData, price: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="価格を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="無料">無料</SelectItem>
                    <SelectItem value="有料">有料</SelectItem>
                    <SelectItem value="フリーミアム">フリーミアム</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>タグ</Label>
                <TagSelector
                  selectedTags={formData.tags}
                  onTagsChange={(tags) => setFormData({ ...formData, tags })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tutorial">チュートリアルURL</Label>
                <Input
                  id="tutorial"
                  type="url"
                  value={formData.tutorial}
                  onChange={(e) =>
                    setFormData({ ...formData, tutorial: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">追加</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AdminLoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  );
}