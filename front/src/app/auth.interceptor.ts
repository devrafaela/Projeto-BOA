import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  console.log('Interceptor chamado para:', req.url, 'Token:', token);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req); // Certifique-se de sempre retornar isso!
};