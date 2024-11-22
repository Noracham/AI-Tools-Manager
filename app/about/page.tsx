import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <h1 className="text-4xl font-bold">AI Tools Managerについて</h1>
      
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