'use client';

import { useState, useEffect, useCallback } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Edit, Trash2, Eye, Wand2 } from 'lucide-react';
import { type Post, getPosts } from '@/lib/posts';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { generateContentHelpers } from '@/ai/flows/content-helpers';
import { uploadFile } from '@/lib/storage';

// Admin email whitelist - only these emails can access the admin dashboard
const ALLOWED_ADMIN_EMAILS = [
  'ovandobrown@gmail.com',
  'oreomac56@gmail.com',
  // Add more admin emails here as needed
];

// Check if an email is allowed to access admin
function isEmailAllowed(email: string): boolean {
  return ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase());
}

// Separate LoginForm component to prevent re-rendering issues
function LoginForm({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  isSigningIn, 
  handleSignIn,
  accessDenied
}: {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isSigningIn: boolean;
  handleSignIn: (e: React.FormEvent) => void;
  accessDenied: boolean;
}) {
      return (
      <div className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>🔐 Admin Access</CardTitle>
            <p className="text-sm text-muted-foreground">
              Only authorized emails can access the admin dashboard.
            </p>
          </CardHeader>
          <CardContent>
            {accessDenied && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">
                  ⚠️ Access denied. Your email is not authorized to access the admin dashboard.
                </p>
              </div>
            )}
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className={accessDenied ? "border-destructive" : ""}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSigningIn}>
                {isSigningIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Contact the site administrator if you need access to the admin dashboard.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [postImageFile, setPostImageFile] = useState<File | null>(null);
  const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const [formData, setFormData] = useState<Omit<Post, 'id'>>({
    title: '', slug: '', category: '', author: '', authorImage: '',
    date: '', image: '', excerpt: '', content: '', readingTime: 0,
    listeningTime: 0, prerequisites: []
  });

  const handleSignIn = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setAccessDenied(false);
    
    if (!isEmailAllowed(email)) {
      setAccessDenied(true);
      toast({ title: "Access Denied", description: "This email is not authorized.", variant: "destructive" });
      setIsSigningIn(false);
      return;
    }
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Success", description: "Signed in successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSigningIn(false);
    }
  }, [email, password, toast]);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch posts", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);


  useEffect(() => {
    if (user && isEmailAllowed(user.email || '')) {
      fetchPosts();
    }
  }, [user, fetchPosts]);

  const handleSignOut = async () => {
    await signOut(auth);
    toast({ title: "Signed out", description: "You have been signed out" });
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: '', slug: '', category: '', author: '', authorImage: '',
      date: '', image: '', excerpt: '', content: '', readingTime: 0,
      listeningTime: 0, prerequisites: []
    });
    setPostImageFile(null);
    setAuthorImageFile(null);
    // Reset file inputs
    const postImageInput = document.getElementById('image') as HTMLInputElement;
    if (postImageInput) postImageInput.value = '';
    const authorImageInput = document.getElementById('authorImage') as HTMLInputElement;
    if (authorImageInput) authorImageInput.value = '';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let postImageUrl = formData.image;
      if (postImageFile) {
        toast({ title: "Uploading Post Image...", description: "Please wait." });
        postImageUrl = await uploadFile(postImageFile, `posts/${postImageFile.name}`);
      }

      let authorImageUrl = formData.authorImage;
      if (authorImageFile) {
        toast({ title: "Uploading Author Image...", description: "Please wait." });
        authorImageUrl = await uploadFile(authorImageFile, `authors/${authorImageFile.name}`);
      }

      const postData = {
        ...formData,
        image: postImageUrl,
        authorImage: authorImageUrl,
      };

      if (editingPost) {
        // Update existing post
        const postRef = doc(db, 'posts', editingPost.id);
        await updateDoc(postRef, postData);
        toast({ title: "Success", description: "Post updated successfully" });
      } else {
        // Create new post
        await addDoc(collection(db, 'posts'), postData);
        toast({ title: "Success", description: "Post created successfully" });
      }
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error("Error submitting post:", error);
      toast({ title: "Error", description: `Failed to ${editingPost ? 'update' : 'create'} post`, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerate = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: 'Missing fields',
        description: 'Please enter a title and content before generating.',
        variant: 'destructive',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateContentHelpers({
        title: formData.title,
        content: formData.content,
      });
      setFormData(prev => ({
        ...prev,
        slug: result.slug,
        excerpt: result.excerpt,
        date: result.date,
        readingTime: result.readingTime,
      }));
      toast({
        title: 'Success!',
        description: 'AI-generated fields have been populated.',
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: 'Error',
        description: 'Could not generate content. Check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await deleteDoc(doc(db, 'posts', postId));
      toast({ title: "Success", description: "Post deleted successfully" });
      fetchPosts();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete post", variant: "destructive" });
    }
  };

  const startEdit = (post: Post) => {
    setEditingPost(post);
    setFormData(post);
    setPostImageFile(null);
    setAuthorImageFile(null);
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!user) {
    return <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} isSigningIn={isSigningIn} handleSignIn={handleSignIn} accessDenied={accessDenied} />;
  }

  if (!isEmailAllowed(user.email || '')) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center text-center">
        <Card className="p-8">
            <CardTitle className="text-2xl text-destructive">Access Denied</CardTitle>
            <p className="mt-2 text-muted-foreground">The account <span className="font-medium text-foreground">{user.email}</span> is not authorized.</p>
            <Button onClick={handleSignOut} className="mt-4">Sign Out</Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🔐 Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your blog posts and site data</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Signed in as {user.email}</span>
          <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Management Column */}
        <div className="space-y-8">
          {/* Create/Edit Post Form */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
                 <Button type="button" variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                  {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Generate with AI
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div><Label htmlFor="title">Title</Label><Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required /></div>
                </div>
                 <div><Label htmlFor="content">Content</Label><Textarea id="content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={10} required /></div>
                
                 <div className="border-t pt-4 space-y-4">
                    <p className="text-sm text-muted-foreground">The slug and excerpt can be auto-generated or manually entered.</p>
                    <div><Label htmlFor="slug">Slug</Label><Input id="slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required /></div>
                    <div><Label htmlFor="excerpt">Excerpt</Label><Textarea id="excerpt" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} required /></div>
                 </div>

                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="category">Category</Label><Input id="category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required /></div>
                  <div><Label htmlFor="author">Author</Label><Input id="author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} required /></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image">Post Image</Label>
                    <Input id="image" type="file" onChange={(e) => setPostImageFile(e.target.files ? e.target.files[0] : null)} accept="image/*" />
                    {editingPost && !postImageFile && formData.image && <p className="text-xs text-muted-foreground mt-1">Current: <a href={formData.image} target="_blank" rel="noopener noreferrer" className="underline">View Image</a>. Upload a new file to replace it.</p>}
                  </div>
                  <div>
                    <Label htmlFor="authorImage">Author Image</Label>
                    <Input id="authorImage" type="file" onChange={(e) => setAuthorImageFile(e.target.files ? e.target.files[0] : null)} accept="image/*" />
                    {editingPost && !authorImageFile && formData.authorImage && <p className="text-xs text-muted-foreground mt-1">Current: <a href={formData.authorImage} target="_blank" rel="noopener noreferrer" className="underline">View Image</a>. Upload a new file to replace it.</p>}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div><Label htmlFor="date">Date</Label><Input id="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} placeholder="Month Day, Year" required /></div>
                  <div><Label htmlFor="readingTime">Reading Time (min)</Label><Input id="readingTime" type="number" value={formData.readingTime} onChange={(e) => setFormData({...formData, readingTime: parseInt(e.target.value) || 0})} required /></div>
                  <div><Label htmlFor="listeningTime">Listening Time (min)</Label><Input id="listeningTime" type="number" value={formData.listeningTime} onChange={(e) => setFormData({...formData, listeningTime: parseInt(e.target.value) || 0})} required /></div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{editingPost ? 'Update Post' : 'Create Post'}</Button>
                  {editingPost && <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>}
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Posts List */}
          <Card>
            <CardHeader><CardTitle>Manage Posts</CardTitle></CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex-1"><h3 className="font-semibold">{post.title}</h3><div className="flex items-center gap-2 mt-1"><Badge variant="secondary">{post.category}</Badge><span className="text-sm text-muted-foreground">{post.date}</span></div></div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => window.open(`/posts/${post.slug}`, '_blank')}><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="outline" onClick={() => startEdit(post)}><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                  {posts.length === 0 && <p className="text-center text-muted-foreground py-8">No posts found. Create your first post!</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}