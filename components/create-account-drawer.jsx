"use client"
import React, { useEffect, useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema } from '@/app/lib/schema';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import useFetch from '@/hooks/use-fetch';
import { createAccount } from '@/actions/dashboard';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue, 
    watch, 
    reset 
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const { 
    data: newAccount, 
    error, 
    fn: createAccountFn, 
    loading: createAccountLoading 
  } = useFetch(createAccount);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  // Handle successful account creation
  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Account created successfully!");
      reset();
      setOpen(false);
    }
  }, [createAccountLoading, newAccount, reset]);
  
  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
        </DrawerHeader>
        <div className='px-4 pb-4'>
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            {/* Account Name */}
            <div className='space-y-2'>
              <label htmlFor="name" className='text-sm font-medium'>
                Account Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Shopping"
                {...register("name")}
                disabled={createAccountLoading}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Account Type */}
            <div className='space-y-2'>
              <label htmlFor="type" className='text-sm font-medium'>
                Account Type
              </label>
              <Select 
                onValueChange={(value) => setValue("type", value)} 
                defaultValue={watch("type")}
                disabled={createAccountLoading}
              >
                <SelectTrigger id='type'>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Initial Balance */}
            <div className='space-y-2'>
              <label htmlFor="balance" className='text-sm font-medium'>
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
                disabled={createAccountLoading}
              />
              {errors.balance && (
                <p className="text-sm text-red-500">{errors.balance.message}</p>
              )}
            </div>
            
            {/* Default Account Toggle */}
            <div className='flex items-center justify-between rounded-lg border p-3'>
              <div className='space-y-0.5'>
                <label htmlFor="isDefault" className='text-sm font-medium cursor-pointer'>
                  Set as Default
                </label>
                <p className='text-sm text-muted-foreground'>
                  This account will be default for making transactions
                </p>
              </div>
              <Switch
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                checked={watch("isDefault")}
                disabled={createAccountLoading}
              />
            </div>

            {/* Action Buttons */}
            <div className='flex gap-2'>
              <DrawerClose asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  disabled={createAccountLoading}
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
};

export default CreateAccountDrawer

// Zod --> Helps in validation
// React Hook Form --> Helps in managing our forms 
// useFetch --> Custom hook for API calls with loading states