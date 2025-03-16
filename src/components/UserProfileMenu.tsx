import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, User } from 'lucide-react';

// Dados do usuário para demonstração
const MOCK_USER = {
  displayName: 'Usuário Demo',
  email: 'demo@example.com',
  photoURL: null
};

export default function UserProfileMenu() {
  const { t } = useTranslation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Obter as iniciais do nome para o fallback do avatar
  const initials = MOCK_USER.displayName
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  
  const handleLogout = () => {
    setIsLoggingOut(true);
    console.log("Logout simulado");
    // Simulação de logout sem usar setTimeout
    setIsLoggingOut(false);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={MOCK_USER.photoURL || undefined} 
              alt={MOCK_USER.displayName}
            />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{MOCK_USER.displayName}</p>
            <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
              {MOCK_USER.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{t('auth.account.profile', 'Perfil')}</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('auth.account.settings', 'Configurações da Conta')}</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-red-600 dark:text-red-400 focus:text-red-700 focus:dark:text-red-300 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>
            {isLoggingOut 
              ? t('auth.logout.loggingOut', 'Saindo...') 
              : t('auth.logout.button', 'Sair')}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 