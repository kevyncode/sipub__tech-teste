import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface SidebarItem {
  label: string;
  iconClass: string;
  route?: string;
  active?: boolean;
  children?: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private router: Router) {}

  items: SidebarItem[] = [
    { label: 'Dashboard', iconClass: 'fas fa-tachometer-alt', route: '/' },
    {
      label: 'Agendamento',
      iconClass: 'fas fa-calendar-alt',
      route: '/agendamento',
    },
    { label: 'Caixa', iconClass: 'fas fa-cash-register', route: '/caixa' },
    { label: 'Clientes', iconClass: 'fas fa-user-friends', route: '/clientes' },
    {
      label: 'Profissional',
      iconClass: 'fas fa-user-tie',
      route: '/profissional',
    },
    {
      label: 'Produtos e Serviços',
      iconClass: 'fas fa-box-open',
      route: '/produtos-servicos',
    },
    {
      label: 'Financeiro',
      iconClass: 'fas fa-dollar-sign',
      route: '/financeiro',
    },
    { label: 'Análise', iconClass: 'fas fa-chart-line', route: '/analise' },
    { label: 'Compras', iconClass: 'fas fa-shopping-cart', route: '/compras' },
    {
      label: 'Cadastros Gerais',
      iconClass: 'fas fa-list',
      route: '/cadastros-gerais',
    },
    { label: 'Consulta', iconClass: 'fas fa-search', route: '/consulta' },
    {
      label: 'Permissões',
      iconClass: 'fas fa-user-shield',
      route: '/permissoes',
    },
    {
      label: 'Configurações',
      iconClass: 'fas fa-cog',
      route: '/configuracoes',
    },
    { label: 'NFS-e', iconClass: 'fas fa-file-invoice', route: '/nfs-e' },
    { label: 'Ajuda', iconClass: 'fas fa-question-circle', route: '/ajuda' },
    { label: 'Sair', iconClass: 'fas fa-sign-out-alt', route: '/sair' },
    {
      label: 'Administrativo',
      iconClass: 'fas fa-user-cog',
      children: [
        {
          label: 'Usuários',
          iconClass: 'fas fa-user',
          route: '/administrativo/usuarios',
        },
        {
          label: 'Permissões',
          iconClass: 'fas fa-user-shield',
          route: '/administrativo/permissoes',
        },
      ],
    },
  ];

  toggle(item: SidebarItem): void {
    if (item.children) {
      item.active = !item.active;
    }
  }

  navigate(item: SidebarItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  isActive(item: SidebarItem): boolean {
    // Dashboard só fica ativo na raiz
    if (item.route === '/') {
      return this.router.isActive(item.route, {
        paths: 'exact',
        queryParams: 'ignored',
        fragment: 'ignored',
        matrixParams: 'ignored',
      });
    }
    // Se tem filhos, só fica ativo se ele mesmo estiver ativo e nenhum filho estiver ativo
    if (item.children) {
      return (
        !!item.route &&
        this.router.isActive(item.route, {
          paths: 'subset',
          queryParams: 'ignored',
          fragment: 'ignored',
          matrixParams: 'ignored',
        }) &&
        !this.isChildActive(item)
      );
    }
    // Se não tem filhos, fica ativo normalmente
    return (
      !!item.route &&
      this.router.isActive(item.route, {
        paths: 'subset',
        queryParams: 'ignored',
        fragment: 'ignored',
        matrixParams: 'ignored',
      })
    );
  }

  isChildActive(item: SidebarItem): boolean {
    if (!item.children) return false;
    return item.children.some((child) => this.isActive(child));
  }
}
