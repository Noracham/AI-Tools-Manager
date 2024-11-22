import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";


export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
        <div className="flex items-center gap-1 md:gap-4">
          <Sparkles className="h-8 md:h-10 w-8 md:w-10 text-purple-500" />
          <div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
              AI Tools Manager
            </h1>
            <p className="text-xs text-muted-foreground">
              AIツールを効率的に管理・探索
            </p>
          </div>
        </div>
      </div>    
      <Card>
        <CardHeader>
          <CardTitle>このアプリについて</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            このアプリは、もともと自分自身のために作りました。AIツールは便利だけど、数が多すぎてどれを使えばいいのか分からない…そんな状況を少しでも整理したかったんです。
          </p>
          
          <p className="text-muted-foreground">
            「だったら、用途別に整理しておけばもっと楽になるんじゃないか？」という発想で始めたものですが、作ってみると意外と便利だと感じました。せっかく作ったので、同じような悩みを持つ人にも使ってもらえたらと思い、公開することにしました。
          </p>
          
          <p className="text-muted-foreground">
            AIに詳しくなくても、簡単に触れるきっかけになれば嬉しいですし、自分の使いやすい形でツールを整理して、日々の作業が少しでもスムーズになれば幸いです。
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>主な機能</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>カテゴリー別の整理</li>
            <li>お気に入り機能</li>
            <li>キーワード検索</li>
            <li>ツールの詳細情報とチュートリアルへのアクセス</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}