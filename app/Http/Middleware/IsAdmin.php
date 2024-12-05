<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class IsAdmin{

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response{
        
        //\Log::info('IsAdmin Middleware triggered for user: ' . auth()->id());

        if (Auth::check() && Auth::user()-> is_admin) {
            return $next($request);
        }

        abort(403,'Acesso negado!!');
    }

}
