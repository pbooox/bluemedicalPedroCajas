<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Type extends Model
{
    protected $fillable = [
        'name', 'payment', 'minutes'
    ];

    public function vehicle(): HasMany {
        return $this->hasMany(Vehicle::class);
    }
}
