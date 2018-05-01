"use strict";
/*
 * The gamestate enumeration
 */
var GameState = {
	unstarted : 0,
	building : 1,
	waving : 2,
	finished : 3,
};

/* 
 * Global objects
 */
var types = {
	units : {},
	towers : {},
	shots : {},
};

/*
 * The GAME
 */
var GameLogic = Base.extend({
	init: function(view, mazeWidth, mazeHeight) {
		var me = this;
		me._super();

		me.towers = [];
		me.units  = [];
		me.shots  = [];

		me.mediPackCost     = constants.mediPackCost;
		me.mediPackFactor   = constants.mediPackFactor;
		me.towerBuildCost   = constants.towerBuildCost;
		me.towerBuildFactor = constants.towerBuildFactor;
		me.maxTowerNumber   = constants.towerBuildNumber;
		me.mediPackHealth   = constants.mediPackHealth;

		me.view          = view;
		me.player        = new Player();
		me.state         = GameState.unstarted;
        me.maze = new Maze(new Size(mazeWidth || 20, mazeHeight || 11));
       
		me.view.mazeSize = me.getMazeSize();
		me.waves         = new WaveList();
		me.currentWave   = new Wave();

		me.player.addEventListener(events.playerDefeated, function(e) {
			me.triggerEvent(events.playerDefeated, e);
			me.finish();
		});

		me.player.addEventListener(events.moneyChanged, function(e) {
			me.triggerEvent(events.moneyChanged, e);
		});

		me.player.addEventListener(events.healthChanged, function(e) {
			me.triggerEvent(events.healthChanged, e);
        });
        me.DefaultMaze();
		me.registerEvent(events.refreshed);
		me.registerEvent(events.waveDefeated);
		me.registerEvent(events.waveFinished);
		me.registerEvent(events.playerDefeated);
		me.registerEvent(events.moneyChanged);
		me.registerEvent(events.healthChanged);
		me.registerEvent(events.waveCreated);
		me.registerEvent(events.unitSpawned);
		me.registerEvent(events.towerNumberChanged);
    },
    DefaultMaze: function () {

        var pos = new Point(0, 5);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(3, 3);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(12, 10);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 9);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 8);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 2);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(5, 1);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(6, 1);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(9, 1);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(10, 1);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(8, 1);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(13, 11);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(14, 11);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(15, 11);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(16, 11);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(17, 11);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(18, 11);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(19, 10);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(19, 9);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(19, 8);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(20, 7);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(20, 6);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(21, 5);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(22, 10);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(22, 9);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(23, 8);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(23, 7);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(1, 8);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(2, 8);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(1, 5);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(2, 4);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(2, 8);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(3, 4);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(3, 7);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(4, 2);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(4, 7);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(5, 1);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(5, 6);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(6, 1);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(6, 5);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(6, 4);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(7, 1);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(7, 3);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(0, 8);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(1, 8);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(2, 8);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(3, 7);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(4, 7);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(5, 6);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(6, 5);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(8, 4);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(8, 5);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(22, 11);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(10, 1);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(9, 1);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 2);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 3);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 4);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 5);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 6);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 7);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 8);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 9);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 10);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(11, 10);
        this.maze.tryBuild(pos, 0);
        var pos = new Point(12, 11);
        this.maze.tryBuild(pos, 0);

    },
	start: function() {		
		if (this.state === GameState.unstarted) {
			this.player.setHitpoints(constants.hitpoints);
			this.player.setMoney(constants.money);
			this.triggerEvent(events.towerNumberChanged, {
				current: this.getNumShooting(),
				maximum: this.maxTowerNumber,
			});
			this.state = GameState.building;
		}

		if (!this.gameLoop) {
			var me = this;
			this.view.start();
			this.gameLoop = setInterval(function() {
				me.tick();
			}, constants.ticks);	
		}
	},
	pause: function() {
		if (this.gameLoop) {
			this.view.pause();
			clearInterval(this.gameLoop);
			this.gameLoop = undefined;	
		}
	},
	update: function(objects) {
		for (var i = objects.length; i--; )
			objects[i].update();
	},
	tick: function() {
		if (this.state !== GameState.building && this.state !== GameState.waving)
			return;

		this.update(this.towers);

		if (this.state === GameState.waving) {
			this.update(this.shots);
			this.update(this.units);
			this.removeDeadObjects();
			var newUnits = this.currentWave.update();

			for (var i = newUnits.length; i--; ) {
				var unit = newUnits[i];
				var path = this.maze.getPath(unit.strategy);
				unit.mazeCoordinates = this.maze.start;
				unit.path = new Path(path);
				this.addUnit(unit);
			}
		}
	},
	finish: function() {
		this.state = GameState.finished;
	},
	getViewSize: function() {
		return this.view.getSize();
	},
	getNumShooting: function() {
		return this.towers.filter(function(tower) {
			//return (tower instanceof Rock) === false;
		}).length;
	},
	getMazeSize: function() {
		return this.maze.gridDim;
	},
	transformCoordinates: function(screenX, screenY) {
		var x = screenX * this.maze.gridDim.width / this.view.width;
		var y = screenY * this.maze.gridDim.height / this.view.height;
		return new Point(~~x, ~~y);
	},
	removeTower: function(tower) {
		tower.removeEventListener(events.shot);
		this.towers.splice(this.towers.indexOf(tower), 1);
		this.view.remove(tower);
	},
	addTower: function(tower) {
		var me = this;
		tower.addEventListener(events.shot, function(shot) {
			me.addShot(shot);
		});
		me.towers.push(tower);
		me.view.add(tower);
	},
	addShot: function(shot) {
		this.shots.push(shot);
		this.view.add(shot);
	},
	addUnit: function(unit) {
		var me = this;
		unit.addEventListener(events.accomplished, function(unt) {
			me.player.hit(unt);
		});
		unit.playInitSound();
		me.units.push(unit);
		me.view.add(unit);
	},
	removeDead: function(objects) {
		for (var i = objects.length; i--; ) {
			if (objects[i].dead) {
				this.view.remove(objects[i]);
				objects.splice(i, 1);
			}
		}
	},
	removeDeadObjects: function() {
		this.removeDead(this.towers);
		this.removeDead(this.shots);
		this.removeDead(this.units);

		if (this.currentWave.finished && this.units.length === 0)
			this.endWave();
	},
	endWave: function() {
		this.player.addMoney(this.currentWave.prizeMoney);
		this.state = GameState.building;

		for (var i = this.shots.length; i--; ) {
			this.view.remove(this.shots[i]);
			this.shots.splice(i, 1);
		}

		this.triggerEvent(events.waveDefeated, this.currentWave);
	},
	beginWave: function() {
		if (this.state === GameState.building) {
			var me = this;
			me.state = GameState.waving;
			var wave = me.waves.next();
			wave.addEventListener(events.waveFinished, function() {
				me.triggerEvent(events.waveFinished);
				wave.removeEventListener(events.waveFinished);
				wave.removeEventListener(events.unitSpawned);
			});
			wave.addEventListener(events.unitSpawned, function(e) {
				me.triggerEvent(events.unitSpawned, e);
			});
			me.triggerEvent(events.waveCreated, wave);
			me.currentWave = wave;
		}
	},
	buildTower: function(pt, type) {
		var newTower = new type();
		//var isrock = newTower instanceof Rock;
		var numShooting = this.getNumShooting();
        var isrock = false;
		if (this.state === GameState.building && type.cost <= this.player.money && (isrock || (numShooting < this.maxTowerNumber))) {
			newTower.mazeCoordinates = pt;
			newTower.cost = type.cost;
			newTower.targets = this.units;

			if (this.maze.tryBuild(pt, newTower.mazeWeight)) {
				this.player.addMoney(-type.cost);
				this.addTower(newTower);

				if (true) {
					this.triggerEvent(events.towerNumberChanged, {
						current: numShooting + 1,
						maximum: this.maxTowerNumber,
					});	
				}

				return true;
			}
		}

		return false;
	},
	destroyTower: function(pt) {
		if (this.state == GameState.building) {
			var towerToRemove = this.towers.filter(function(t) {
				return t.mazeCoordinates.x === pt.x && t.mazeCoordinates.y === pt.y;
			})[0];

			if (towerToRemove) {
				this.player.addMoney(0.5 * towerToRemove.cost);
				this.removeTower(towerToRemove);
				this.maze.tryRemove(pt);

				if (!(towerToRemove instanceof Rock)) {
					this.triggerEvent(events.towerNumberChanged, {
						current: this.getNumShooting(),
						maximum: this.maxTowerNumber,
					});
				}
			}
		}
	},
	buyMediPack: function() {
		var cost = this.mediPackCost;

		if (this.player.money > cost) {
			this.player.addHitpoints(this.mediPackHealth);
			this.mediPackCost = ~~(this.mediPackFactor * cost);
			this.player.addMoney(-cost);
			return true;
		}

		return false;
	},
	buyTowerBuildRight: function() {
		var cost = this.towerBuildCost;

		if (this.player.money > cost) {
			var numShooting = this.getNumShooting();
			this.maxTowerNumber++;

			this.triggerEvent(events.towerNumberChanged, {
				current: numShooting,
				maximum: this.maxTowerNumber,
			});

			this.towerBuildCost = ~~(this.towerBuildFactor * cost);
			this.player.addMoney(-cost);
			return true;
		}

		return false;
	},
});

/*
 * The WAVELIST
 */
var WaveList = Class.extend({
	init: function() {
		this.waves = [];
		this.index = 0;
		this.unitNames = Object.keys(types.units);
	},
	random: function() {
		var wave = new Wave();
		var n = rand(Math.max(~~(this.index * 0.5), 1), this.index);
		var maxtime = 1300 * n;
		wave.prizeMoney = n;

		for (var i = 0; i < n; ++i) {
			var j = rand(0, Math.min(this.unitNames.length, ~~(this.index * 0.2) + 1));
			var name = this.unitNames[j];
			var unit = new (types.units[name])();
			wave.add(unit, i === 0 ? 0 : rand(0, maxtime));
		}

		return wave;
	},
	next: function() {
		if (this.index < this.waves.length)
			return this.waves[this.index++];

		++this.index;
		return this.random();
	},
});

/*
 * The WAVE
 */
var Wave = Base.extend({
	init: function() {
		this._super();
		this.startTime = 0;
		this.units = [];
		this.prizeMoney = 0;
		this.finished = false;
		this.registerEvent(events.unitSpawned)
		this.registerEvent(events.waveFinished);
	},
	add: function(unit, time) {
		this.units.push({
			time: time,
			unit: unit
		});
	},
	update: function() {
		var unitsToSpawn = [];

		if (!this.finished) {
			for (var i = this.units.length; i--; ) {
				if (this.units[i].time < this.startTime) {
					unitsToSpawn.push(this.units[i].unit);
					this.units.splice(i, 1);
				}
			}

			if (this.units.length === 0) {
				this.finished = true;
				this.triggerEvent(events.waveFinished);
			}

			if (unitsToSpawn.length > 0) {
				var remaining = this.units.length;
				this.triggerEvent(events.unitSpawned, remaining); 				
			}

			this.startTime += constants.ticks;
		}

		return unitsToSpawn;
	},
});