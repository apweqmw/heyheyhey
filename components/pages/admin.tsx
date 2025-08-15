'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '@/components/header';
import { useToast } from '@/hooks/use-toast';

const firmSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  rating: z.number().min(0).max(5),
  minAccountSize: z.number().min(0),
  platforms: z.array(z.string()),
  maxPayoutDays: z.number().min(0).optional(),
  payoutSchedule: z.string().optional(),
  tradingRules: z.string().optional(),
  affiliateUrl: z.string().optional(),
  couponCode: z.string().optional(),
});

type FirmFormData = z.infer<typeof firmSchema>;

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingFirm, setEditingFirm] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: firms = [], isLoading } = useQuery({
    queryKey: ['/api/firms'],
    queryFn: async () => {
      const response = await fetch('/api/firms');
      if (!response.ok) throw new Error('Failed to fetch firms');
      return response.json();
    }
  });

  const form = useForm<FirmFormData>({
    resolver: zodResolver(firmSchema),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      rating: 0,
      minAccountSize: 0,
      platforms: [],
      maxPayoutDays: 0,
      payoutSchedule: '',
      tradingRules: '',
      affiliateUrl: '',
      couponCode: '',
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: FirmFormData) => {
      const response = await fetch('/api/firms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create firm');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/firms'] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: 'Success', description: 'Firm created successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create firm', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FirmFormData }) => {
      const response = await fetch(`/api/firms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update firm');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/firms'] });
      setIsDialogOpen(false);
      setEditingFirm(null);
      form.reset();
      toast({ title: 'Success', description: 'Firm updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update firm', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/firms/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete firm');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/firms'] });
      toast({ title: 'Success', description: 'Firm deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete firm', variant: 'destructive' });
    },
  });

  const onSubmit = (data: FirmFormData) => {
    if (editingFirm) {
      updateMutation.mutate({ id: editingFirm.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (firm: any) => {
    setEditingFirm(firm);
    form.reset({
      name: firm.name,
      description: firm.description || '',
      slug: firm.slug,
      rating: firm.rating,
      minAccountSize: firm.minAccountSize,
      platforms: firm.platforms || [],
      maxPayoutDays: firm.maxPayoutDays || 0,
      payoutSchedule: firm.payoutSchedule || '',
      tradingRules: firm.tradingRules || '',
      affiliateUrl: firm.affiliateUrl || '',
      couponCode: firm.couponCode || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this firm?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingFirm(null);
                  form.reset();
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Firm
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingFirm ? 'Edit Firm' : 'Add New Firm'}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., my-prop-firm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                max="5" 
                                step="0.1"
                                {...field} 
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="minAccountSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Min Account Size</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                {...field} 
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex gap-4 justify-end">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                        {editingFirm ? 'Update' : 'Create'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid gap-6">
              {firms.map((firm: any) => (
                <Card key={firm.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {firm.name}
                          <Badge variant="secondary">⭐ {firm.rating}</Badge>
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                          Slug: {firm.slug} | Min Size: ${(firm.minAccountSize / 1000)}K
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(firm)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(firm.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {firm.description || 'No description available'}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {firm.platforms?.map((platform: string) => (
                        <Badge key={platform} variant="outline">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}