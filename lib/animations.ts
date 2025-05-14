export type AnimationDirection = 'left' | 'right' | 'up' | 'down' | 'fade' | 'none'
export type RouteAnimationConfig = {
  enter: AnimationDirection
  exit: AnimationDirection
}

// Конфигурация анимаций для маршрутов
export const routeAnimations: Record<string, RouteAnimationConfig> = {
  '/': {
    enter: 'none',
    exit: 'none'
  },
  '/likes': {
    enter: 'left',
    exit: 'right'
  },
  '/profile': {
    enter: 'right',
    exit: 'left'
  },
  '/settings': {
    enter: 'up',
    exit: 'down'
  },
  // Добавляйте новые маршруты по аналогии
}

// Получение конфига для маршрута
export const getRouteAnimation = (pathname: string): RouteAnimationConfig => {
  return routeAnimations[pathname] || {
    enter: 'fade',
    exit: 'fade'
  }
}